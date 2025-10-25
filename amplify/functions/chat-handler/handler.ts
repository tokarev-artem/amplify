export const handler = async (event: any) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  
  try {
    const { message, sessionId } = JSON.parse(event.body || '{}');
    
    if (!message) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    // Demo responses for now - we'll add Bedrock later
    let response = '';
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('service')) {
      response = 'TechCorp offers cloud migration, AI/ML consulting, custom software development, and DevOps services. Our team specializes in helping businesses modernize their technology stack.';
    } else if (lowerMessage.includes('hour') || lowerMessage.includes('time')) {
      response = 'Our business hours are Monday-Friday 9:00 AM - 6:00 PM PST, Saturday 10:00 AM - 4:00 PM PST, and we\'re closed on Sunday. Enterprise customers have access to 24/7 support.';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
      response = 'You can reach our support team at support@techcorp.com or call +1-555-0123. We also offer live chat support on our website during business hours.';
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      response = 'Our services start at $99/month for basic cloud consulting. Enterprise packages are available starting at $999/month. Contact us for a custom quote based on your specific needs.';
    } else if (lowerMessage.includes('cloud') || lowerMessage.includes('aws') || lowerMessage.includes('azure')) {
      response = 'Yes! We support all major cloud providers including AWS, Microsoft Azure, and Google Cloud Platform. Our team has extensive experience with cloud migrations and serverless architectures.';
    } else {
      response = `Thank you for your question: "${message}". I'm your TechCorp AI assistant. I can help you with information about our services, pricing, contact details, and technical capabilities. What would you like to know?`;
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        response: response,
        sessionId: sessionId || `session-${Date.now()}`,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};
