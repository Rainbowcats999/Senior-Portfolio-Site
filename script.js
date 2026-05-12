document.addEventListener('DOMContentLoaded', function(){
	// Fill current year
	const y = new Date().getFullYear();
	const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = y;

	// Mobile nav toggle
	const nav = document.getElementById('main-nav');
	const toggle = document.getElementById('nav-toggle');
	if(toggle && nav){
		toggle.addEventListener('click', ()=>{
			const shown = nav.style.display === 'flex';
			nav.style.display = shown ? 'none' : 'flex';
			nav.style.flexDirection = 'column';
			nav.style.gap = '12px';
		});
	}

	// Smooth scrolling for anchor links
	document.querySelectorAll('a[href^="#"]').forEach(a=>{
		a.addEventListener('click', function(e){
			const href = this.getAttribute('href');
			if(href.length>1){
				e.preventDefault();
				const target = document.querySelector(href);
				if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
			}
		});
	});

	// Project filters (support .project and .proj-card markup)
	const filters = document.querySelectorAll('.filter');
	const projects = document.querySelectorAll('.project, .proj-card');
	filters.forEach(btn=>{
		btn.addEventListener('click', ()=>{
			filters.forEach(b=>b.classList.remove('active'));
			btn.classList.add('active');
			const f = btn.dataset.filter;
			projects.forEach(p=>{
				const t = p.dataset.type || p.getAttribute('data-type');
				if(f==='all' || t===f) p.style.display = '';
				else p.style.display = 'none';
			});
		});
	});

	// Contact form (stub)
	const contactForm = document.getElementById('contact-form');
	if(contactForm){
		contactForm.addEventListener('submit', function(e){
			e.preventDefault();
			alert('Thanks — message sent (demo).');
			contactForm.reset();
		});
	}

	// Reveal-on-scroll: add .reveal then observe and toggle .in-view
	const revealSelectors = ['.card', '.project', '.profile-card', '.about-card', '.contact-form', '.hero-left', '.hero-right'];
	const revealElements = [];
	revealSelectors.forEach(sel=>{document.querySelectorAll(sel).forEach(el=>{el.classList.add('reveal');revealElements.push(el)})});

	if(revealElements.length){
		const obs = new IntersectionObserver((entries)=>{
			entries.forEach(ent=>{
				if(ent.isIntersecting){
					ent.target.classList.add('in-view');
					obs.unobserve(ent.target);
				}
			});
		},{threshold:0.12});
		revealElements.forEach(el=>obs.observe(el));
	}

	// subtle brand glow toggle (adds gentle pulsing)
	const brand = document.querySelector('.brand');
	if(brand) brand.classList.add('glow');
  
	// Mark nav / sidebar active based on current page
	const path = location.pathname.split('/').pop() || 'index.html';
	document.querySelectorAll('.top-nav .nav-link').forEach(a=>{
		const href = a.getAttribute('href');
		if(href && href.split('/').pop()===path) a.classList.add('active');
	});
	document.querySelectorAll('.side-links .side-btn').forEach(a=>{
		const href = a.getAttribute('href');
		if(href && href.split('/').pop()===path) a.classList.add('active');
	});
});

