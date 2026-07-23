import {test, expect} from '@playwright/test' 

async function apiWithRetry(apiContext, url, options={}){
    const maxRetries=3;
    let attempt=0;
    while(attempt<maxRetries){
        const response=await apiContext.get(url, options);
        if(response.status() !==429){
            return response;
        }
        const retryAfter=Number(response.headers()['retry-after'])||Math.pow(2, attempt);
        await new Promise(res=>setTimeout(res, retryAfter*1000));
        attempt++;
    }
    throw new Error(`API throttling after ${maxRetries} retries`)
}

test('handle API throttling with exponentialback off', async({request})=>{
    const response= await apiWithRetry(request, 'https://api.example.com/data');
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);

})