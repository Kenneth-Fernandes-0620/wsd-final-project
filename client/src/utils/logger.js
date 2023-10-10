export default function log(logObject) {
  const locations = window.location.href.split(':');
  console.log(logObject);
  fetch(`${locations[0]}:${locations[1]}:5000/api/log`, {
    method: 'POST',
    body: JSON.stringify({ message: 'Hello' }),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(() => {
    console.log('Done');
  });
}
