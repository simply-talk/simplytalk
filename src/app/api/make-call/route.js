// app/api/make-call/route.js
import twilio from 'twilio';

export async function POST(request) {
  console.log('=== CALL API DEBUG START ===');
  
  try {
    const body = await request.json();
    console.log('1. Raw request body:', JSON.stringify(body, null, 2));
    
    const { toNumber, fromNumber, bookingId, topic, customerName } = body;

    // Validate environment variables first
    console.log('2. Checking environment variables...');
    console.log('TWILIO_ACCOUNT_SID exists:', !!process.env.TWILIO_ACCOUNT_SID);
    console.log('TWILIO_AUTH_TOKEN exists:', !!process.env.TWILIO_AUTH_TOKEN);
    console.log('TWILIO_PHONE_NUMBER:', process.env.TWILIO_PHONE_NUMBER);
    console.log('YOUR_BUSINESS_NUMBER:', process.env.YOUR_BUSINESS_NUMBER);

    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      console.log('❌ Missing Twilio environment variables');
      return Response.json(
        { error: 'Twilio configuration is missing. Check environment variables.' },
        { status: 500 }
      );
    }

    // Validate required fields
    if (!toNumber) {
      console.log('❌ Missing toNumber');
      return Response.json(
        { error: 'Customer phone number is required' },
        { status: 400 }
      );
    }

    console.log('3. Input validation passed');

    // Initialize Twilio client
    console.log('4. Initializing Twilio client...');
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Test Twilio connection by checking account
    try {
      const account = await client.api.accounts(process.env.TWILIO_ACCOUNT_SID).fetch();
      console.log('5. Twilio connection successful. Account status:', account.status);
    } catch (authError) {
      console.log('❌ Twilio authentication failed:', authError.message);
      return Response.json(
        { error: 'Twilio authentication failed', details: authError.message },
        { status: 401 }
      );
    }

    // Format phone number for India
    console.log('6. Formatting phone number...');
    const formatIndianNumber = (phoneNumber) => {
      let cleanNumber = phoneNumber.toString().replace(/[\s\-\(\)\+]/g, '');
      console.log('   - Original:', phoneNumber);
      console.log('   - Cleaned:', cleanNumber);
      
      if (cleanNumber.startsWith('91') && cleanNumber.length === 12) {
        cleanNumber = cleanNumber.substring(2);
        console.log('   - Removed 91 prefix:', cleanNumber);
      }
      
      if (cleanNumber.startsWith('0') && cleanNumber.length === 11) {
        cleanNumber = cleanNumber.substring(1);
        console.log('   - Removed 0 prefix:', cleanNumber);
      }
      
      if (cleanNumber.length !== 10) {
        throw new Error(`Invalid phone number: expected 10 digits, got ${cleanNumber.length}: ${cleanNumber}`);
      }
      
      const validPrefixes = ['6', '7', '8', '9'];
      if (!validPrefixes.includes(cleanNumber[0])) {
        throw new Error(`Invalid mobile number: must start with 6,7,8,9. Got: ${cleanNumber[0]}`);
      }
      
      // Return multiple formats to try
      return [
        `+91${cleanNumber}`, // +918180052875
        `+91 ${cleanNumber}`, // +91 8180052875
        `+91 ${cleanNumber.substring(0, 5)} ${cleanNumber.substring(5)}`, // +91 81800 52875
        `+91${cleanNumber.substring(0, 5)} ${cleanNumber.substring(5)}`, // +9181800 52875
      ];
    };

    const formatsToTry = formatIndianNumber(toNumber);
    console.log('7. Formats to try:', formatsToTry);

    // Check which verified numbers exist and find matching format
    try {
      console.log('8. Checking verified caller IDs...');
      const verifiedNumbers = await client.outgoingCallerIds.list();
      console.log('   - Verified numbers in your account:');
      verifiedNumbers.forEach(num => {
        console.log(`   - "${num.phoneNumber}" (${num.friendlyName})`);
      });
      
      // Check if any of our formats match verified numbers
      const matchingNumbers = formatsToTry.filter(format => 
        verifiedNumbers.some(verified => verified.phoneNumber === format)
      );
      console.log('   - Matching verified numbers:', matchingNumbers);
      
      if (matchingNumbers.length === 0) {
        console.log('❌ No matching verified numbers found');
        return Response.json(
          { 
            error: 'Phone number not verified', 
            message: `The number ${toNumber} is not verified in any format.`,
            verifiedNumbers: verifiedNumbers.map(n => n.phoneNumber),
            triedFormats: formatsToTry,
            instructions: 'Go to Twilio Console → Phone Numbers → Verified Caller IDs → Verify new number',
            recommendedFormat: formatsToTry[0]
          },
          { status: 400 }
        );
      }
      
      // Use the first matching format
      const numberToCall = matchingNumbers[0];
      console.log('9. Using verified number format:', numberToCall);
      
      // Create a call to CUSTOMER first (alternative approach)
      console.log('10. Creating Twilio call to customer first...');
      const call = await client.calls.create({
        to: numberToCall, // Call customer first
        from: process.env.TWILIO_PHONE_NUMBER,
        
        // When customer answers, connect them to you
        twiml: `<Response>
                  <Say voice="alice">
                    Hello ${customerName || 'there'}, this is a call regarding your booking for ${topic || ''} with id ${bookingId || ''}. 
                    Please hold while we connect you to our representative.
                  </Say>
                  <Dial timeout="120" timeLimit="1800" record="true">
                    <Number>${process.env.YOUR_BUSINESS_NUMBER || fromNumber}</Number>
                  </Dial>
                  <Say voice="alice">
                    We're sorry, our representative is not available right now. 
                    We'll call you back shortly.
                  </Say>
                </Response>`,
        
        statusCallback: process.env.NEXT_PUBLIC_BASE_URL ? 
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/call-status` : undefined,
        statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
        record: true,
      });

      console.log('✅ Call created successfully:', {
        callSid: call.sid,
        to: numberToCall,
        from: process.env.TWILIO_PHONE_NUMBER,
        status: call.status
      });

      console.log('=== CALL API DEBUG END ===');

      return Response.json({
        success: true,
        callSid: call.sid,
        status: call.status,
        calledNumber: numberToCall,
        timestamp: new Date().toISOString()
      });
      
    } catch (listError) {
      console.log('❌ Error checking verified numbers:', listError.message);
      return Response.json(
        { error: 'Could not check verified numbers', details: listError.message },
        { status: 500 }
      );
    }

  } catch (error) {
    console.log('❌ MAIN ERROR:', error);
    console.log('=== CALL API DEBUG END ===');
    
    // Handle specific Twilio errors
    let errorMessage = 'Failed to initiate call';
    let statusCode = 500;
    
    if (error.code === 21219) {
      errorMessage = `The number is unverified. Please verify it in Twilio Console.`;
      statusCode = 400;
    } else if (error.code === 21614) {
      errorMessage = `Invalid phone number format`;
      statusCode = 400;
    } else if (error.code === 21408) {
      errorMessage = 'Permission to call this number is forbidden';
      statusCode = 403;
    } else if (error.code === 20003) {
      errorMessage = 'Authentication error - check Twilio credentials';
      statusCode = 401;
    } else if (error.code === 21217) {
      errorMessage = 'Phone number is not a valid mobile number';
      statusCode = 400;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return Response.json(
      { 
        error: errorMessage, 
        details: error.message,
        code: error.code,
        originalNumber: toNumber
      },
      { status: statusCode }
    );
  }
}