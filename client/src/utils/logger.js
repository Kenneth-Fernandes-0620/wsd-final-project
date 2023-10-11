const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

export default function log(key, value) {
  const urlencoded = new URLSearchParams();
  urlencoded.append(key, value);
  const locations = window.location.href.split(':');
  console.log(`http:${locations[1]}:5000/api/log`);
  try {
    fetch(`${locations[0]}:${locations[1]}:5000/api/log`, {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      mode: 'no-cors',
      redirect: 'follow'
    })
      .then(() => {
        console.log('Done');
      })
      .catch(() => {
        /* empty */
      });
  } catch (err) {
    /* empty */
  }
}
