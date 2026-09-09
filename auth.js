const AUTH_CONFIG={url:'https://xcvjyohvrfakhxoevlff.supabase.co',key:'sb_publishable_m7rsHfm0OpEtSrQui8HAiA_59l_S3UV'};
const authDb=window.supabase.createClient(AUTH_CONFIG.url,AUTH_CONFIG.key);

function installSignup(){
  if(!document.querySelector('.login-card')||document.getElementById('signup'))return;
  const login=document.getElementById('login');
  if(!login)return;
  const wrap=document.createElement('div');
  wrap.innerHTML='<button id="signup" class="btn secondary wide" type="button">CREATE DOCTOR ACCOUNT</button><button id="forgot" class="btn secondary wide" type="button" style="margin-top:8px">FORGOT PASSWORD</button><div id="authmsg" class="muted login-note" style="margin-top:10px;text-align:center"></div>';
  login.parentElement.appendChild(wrap);
  document.getElementById('signup').onclick=createDoctorAccount;
  document.getElementById('forgot').onclick=resetPassword;
}

async function createDoctorAccount(){
  const email=document.getElementById('email')?.value.trim();
  const password=document.getElementById('password')?.value||'';
  const msg=document.getElementById('authmsg');
  if(!email||!password){msg.textContent='ENTER EMAIL AND PASSWORD FIRST.';return;}
  if(password.length<6){msg.textContent='PASSWORD MUST BE AT LEAST 6 CHARACTERS.';return;}
  const b=document.getElementById('signup');b.disabled=true;b.textContent='CREATING ACCOUNT…';msg.textContent='';
  const {data,error}=await authDb.auth.signUp({email,password});
  if(error){msg.textContent='ACCOUNT CREATION FAILED: '+error.message;b.disabled=false;b.textContent='CREATE DOCTOR ACCOUNT';return;}
  if(data.session){msg.textContent='ACCOUNT CREATED. OPENING PRIME HOSPITAL…';setTimeout(()=>location.reload(),300);return;}
  msg.textContent='ACCOUNT CREATED. CHECK YOUR EMAIL TO CONFIRM, THEN LOGIN.';
  b.disabled=false;b.textContent='CREATE DOCTOR ACCOUNT';
}

async function resetPassword(){
  const email=document.getElementById('email')?.value.trim();
  const msg=document.getElementById('authmsg');
  if(!email){msg.textContent='ENTER YOUR EMAIL FIRST.';return;}
  const {error}=await authDb.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});
  msg.textContent=error?'RESET FAILED: '+error.message:'PASSWORD RESET EMAIL SENT.';
}

new MutationObserver(installSignup).observe(document.body,{childList:true,subtree:true});
installSignup();
