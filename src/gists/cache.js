cache = this.caches;

( async () => {
  console.log('starting')
  let newCache = await caches.open('new-cache');
  console.log( 'cacheobject: ', newCache )
  
  /// newCache.put('/cats.json', new Response('{"james": "kitten", "daniel": "kitten"}'))

  const request = '/cats.json';
  const response = await (await newCache.match(request)).text();

  console.log('request: ', request, 'response:', response)
  
} ) ()



const channel = new BroadcastChannel('app-data');
channel.addEventListener ('message', (event) => {
 console.log(event.data);
});