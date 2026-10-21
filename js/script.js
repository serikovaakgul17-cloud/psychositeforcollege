
document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu-btn'), links=document.querySelector('.nav-links');
  if(menu) menu.addEventListener('click',()=>links.classList.toggle('open'));

  const current=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    if(a.getAttribute('href')===current) a.classList.add('active');
    a.addEventListener('click',()=>links?.classList.remove('open'));
  });

  const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));

  document.querySelectorAll('form[data-demo]').forEach(form=>{
    form.addEventListener('submit',e=>{e.preventDefault(); form.reset(); showToast(form.dataset.message||'Өтінішіңіз сәтті жіберілді!');});
  });

  document.querySelectorAll('[data-material]').forEach(card=>{
    card.addEventListener('click',()=>{
      const text=card.dataset.material;
      showToast(text);
    });
  });

  const test=document.querySelector('#test');
  if(test){
    const questions=[
      ['Қазіргі көңіл-күйіңізді қалай бағалайсыз?',['Өте жақсы','Жақсы','Орташа','Көңілсіз']],
      ['Соңғы күндері өзіңізді қаншалықты шаршағандай сезіндіңіз?',['Мүлде емес','Аздап','Жиі','Өте қатты']],
      ['Күнделікті мәселелер сізді қаншалықты алаңдатады?',['Мүлде алаңдатпайды','Сирек','Кейде','Жиі']],
      ['Өзіңізге уақыт бөлу қаншалықты жиі болады?',['Күн сайын','Жиі','Сирек','Мүлде болмайды']],
      ['Қиын жағдайда біреуден көмек сұрай аласыз ба?',['Әрқашан','Көбіне','Қиындықпен','Сұрамаймын']]
    ];
    let i=0, score=0;
    const q=test.querySelector('.question'), answers=test.querySelector('.answers'), bar=test.querySelector('.progress span'), result=test.querySelector('.result');
    function render(){q.textContent=questions[i][0];answers.innerHTML='';questions[i][1].forEach((a,n)=>{const b=document.createElement('button');b.className='answer';b.textContent=a;b.type='button';b.onclick=()=>{score+=n;i++;bar.style.width=(i/questions.length*100)+'%';if(i<questions.length)render();else finish()};answers.appendChild(b)});}
    function finish(){q.textContent='Тест аяқталды';answers.innerHTML='';let msg=score<=5?'Жағдайыңыз салыстырмалы түрде тұрақты. Өзіңізге көңіл бөлуді жалғастырыңыз.':score<=10?'Сізде шаршау немесе алаңдау белгілері болуы мүмкін. Демалыс пен қолдауға уақыт бөліңіз.':'Қазіргі жүктеме сізге әсер етуі мүмкін. Психологпен сөйлесіп, жағдайыңызды бірге талқылаған пайдалы.';result.style.display='block';result.textContent=msg;}
    render();
  }
});
function showToast(msg){const t=document.querySelector('.toast')||(()=>{const x=document.createElement('div');x.className='toast';document.body.appendChild(x);return x})();t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),4000)}
