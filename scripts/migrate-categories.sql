-- Migrare categorii blog VS.ro
-- Ruleaza in containerul Docker de productie

-- 1. Redenumire categorii
UPDATE Category SET name='AI pentru Business', slug='ai-business', description='Cum poti folosi AI-ul in firma ta pentru a creste productivitatea si a reduce costurile' WHERE slug='ai';
UPDATE Category SET name='Automatizari pentru Firme', slug='automatizari-firme', description='Automatizari care elimina munca manuala si iti economisesc timp si bani' WHERE slug='automatizare';
UPDATE Category SET name='Software Custom', slug='software-custom', description='Solutii software personalizate pentru nevoile unice ale afacerii tale' WHERE slug='dezvoltare';
UPDATE Category SET name='Site-uri & Magazine Online', slug='site-uri-magazine-online', description='Site-uri de prezentare si magazine online care iti aduc clienti noi' WHERE slug='produs-digital';
UPDATE Category SET name='Optimizare & Performanta', slug='optimizare-performanta', description='Cum sa imbunatatesti performanta site-ului si sa cresti conversiile' WHERE slug='tendinte';

-- 2. Categorie noua
INSERT INTO Category (id, name, slug, description, color, createdAt, updatedAt) VALUES (lower(hex(randomblob(12))), 'Ghiduri & Tutoriale', 'ghiduri-tutoriale', 'Ghiduri practice si tutoriale pas cu pas pentru antreprenori si manageri', '#9f8be7', datetime('now'), datetime('now'));

-- 3. Muta postari din DevOps
UPDATE PostCategory SET categoryId=(SELECT id FROM Category WHERE slug='software-custom') WHERE postId IN (SELECT id FROM Post WHERE title LIKE '%stack-ul tehnic%') AND categoryId=(SELECT id FROM Category WHERE slug='devops');
UPDATE PostCategory SET categoryId=(SELECT id FROM Category WHERE slug='automatizari-firme') WHERE postId IN (SELECT id FROM Post WHERE title LIKE '%DevOps pentru incepatori%') AND categoryId=(SELECT id FROM Category WHERE slug='devops');

-- 4. Curatenie
DELETE FROM PostCategory WHERE categoryId NOT IN (SELECT id FROM Category);
DELETE FROM Category WHERE slug='devops';
DELETE FROM Category WHERE slug='ux-ui';
