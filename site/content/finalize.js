COURSE.modules.forEach(m=>m.lessons.forEach(l=>{l.body=buildLessonBody(l.title,m.title,l.concepts||[]);}));
