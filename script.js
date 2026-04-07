let currentCode = null;
let codeTimer = null;

function randomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for(let i=0;i<8;i++){
        code += chars.charAt(Math.floor(Math.random()*chars.length));
    }
    return code;
}

function generateCode() {
    const phone = document.getElementById('phoneNumber').value.trim();
    if (!phone) return alert('Enter your WhatsApp number!');

    const code = randomCode();
    currentCode = code;
    document.getElementById('pairingCode').innerText = code;

    let timeLeft = 60;
    document.getElementById('timer').innerText = `Code expires in ${timeLeft}s`;

    if(codeTimer) clearInterval(codeTimer);
    codeTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Code expires in ${timeLeft}s`;
        if(timeLeft <= 0){
            clearInterval(codeTimer);
            currentCode = null;
            document.getElementById('pairingCode').innerText = 'EXPIRED';
            document.getElementById('timer').innerText = '';
        }
    },1000);

    // Send code + session to backend
    const sessionId = 'Malai-' + Math.random().toString(36).substring(2,12);
    document.getElementById('sessionId').innerText = sessionId;

    fetch('https://YOUR-BACKEND-URL/pair', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ phone, code, sessionId })
    }).then(res=>res.json())
      .then(data=>{
          if(data.success){
              alert('Pairing code sent to WhatsApp for verification!');
          } else {
              alert('Error sending code');
          }
      });
}
