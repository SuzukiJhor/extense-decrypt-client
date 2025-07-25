document.getElementById('decryptBtn').onclick = async function () {
  const hash1 = document.getElementById('hash1').value;
  const hash3 = document.getElementById('hash3').value;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  if (!hash1 || !hash3)
    return resultDiv.innerHTML = '<span style="color:red;">Ambos  hash1 e hash3 sao necessarios.</span>';

  try {
    const response = await fetch('http://localhost:3001/decrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hash1, hash3 })
    });
    const data = await response.json();
    if (data.decrypted) {
      resultDiv.innerHTML = `<pre class="break-all">${JSON.stringify(data.decrypted, null, 2)}</pre>`;
      return;
    }
    resultDiv.innerHTML = `<span style="color:red;">Error: ${data.error || 'Unknown error'}</span>`;
  } catch (err) {
    resultDiv.innerHTML = `<span style="color:red;">Request failed: ${err.message}</span>`;
  }
};