document.getElementById('decryptBtn').onclick = async function () {
  const hash1 = document.getElementById('hash1').value;
  const hash3 = document.getElementById('hash3').value;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  if (!hash1 || !hash3) {
    resultDiv.innerHTML = '<span style="color:red;">Ambos  hash1 e hash3 são necessários.</span>';
    return;
  }

  try {
    const response = await fetch('http://localhost:3001/decrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hash1, hash3 })
    });
    const data = await response.json();
    if (data.decrypted) {
      resultDiv.innerHTML = `<pre>${JSON.stringify(data.decrypted, null, 2)}</pre>`;
    } else {
      resultDiv.innerHTML = `<span style="color:red;">Error: ${data.error || 'Unknown error'}</span>`;
    }
  } catch (err) {
    resultDiv.innerHTML = `<span style="color:red;">Request failed: ${err.message}</span>`;
  }
};