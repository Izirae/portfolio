export const portfolioData = {
  personal: {
    name: "Lautaro Bazzola",
    role: "Full Stack Developer",
    location: "Buenos Aires, Argentina",
    github: "https://github.com/Izirae",
    email: "lautaro.bazzola@gmail.com",
    linkedin: "https://linkedin.com/in/l-bazzola/",
    bio: [
      "Soy Lautaro Bazzola, desarrollador Full Stack con base en Buenos Aires. Me especializo en construir sistemas web completos, desde APIs robustas hasta interfaces modernas, con foco en soluciones que funcionan en producción y resuelven problemas reales. Mi lenguaje principal es PHP con Laravel y Lumen, pero me muevo con igual comodidad en el ecosistema JavaScript: Node.js, TypeScript y React son parte de mi día a día.",
      "La mayor parte de mi experiencia profesional la desarrollé en la Municipalidad de Morón, donde diseñé y mantuve desde cero un ecosistema de microservicios que hoy opera en producción para miles de vecinos y proveedores. Ese trabajo implicó trabajar con Oracle, SQL Server y MySQL como motores de base de datos, procesar pagos reales a través de Provincia.Net, Mercado Pago e Interbanking, implementar autenticación LDAP corporativa y entregar portales de autogestión que simplifican trámites que antes requerían presencia física.",
      "En paralelo desarrollo proyectos propios: un bot de monitoreo de criptomonedas con notificaciones multicanal, una tienda online con checkout en producción, y sistemas de gestión sectorial. Me interesa trabajar en equipos que valoren el código limpio, la arquitectura simple y el impacto concreto de lo que se construye."
    ],
    stats: [
      { num: "12+", label: "Proyectos en producción" },
      { num: "2",   label: "Ecosistemas backend completos" },
      { num: "5+",  label: "APIs externas integradas" },
      { num: "1",   label: "Municipio atendido en producción" }
    ]
  },
  skills: [
    { title: "Backend PHP",         color: "#b07ef7", items: [{ label:"Laravel",hi:true},{ label:"Lumen",hi:true},{ label:"PHP",hi:false},{ label:"Eloquent",hi:false},{ label:"JWT",hi:false},{ label:"LDAP",hi:false},{ label:"Blade",hi:false}] },
    { title: "Backend JS",          color: "#3dd68c", items: [{ label:"Node.js",hi:true},{ label:"Express",hi:true},{ label:"TypeScript",hi:true},{ label:"REST API",hi:false},{ label:"Sequelize",hi:false},{ label:"node-cron",hi:false}] },
    { title: "Frontend",            color: "#38c5d9", items: [{ label:"React",hi:true},{ label:"Vite",hi:true},{ label:"Tailwind CSS",hi:false},{ label:"Chakra UI",hi:false},{ label:"Framer Motion",hi:false},{ label:"React Router",hi:false}] },
    { title: "Bases de datos",      color: "#f7b155", items: [{ label:"SQL Server",hi:true},{ label:"MySQL",hi:true},{ label:"Oracle DB",hi:true},{ label:"SQLite",hi:false},{ label:"Firebase",hi:false}] },
    { title: "APIs & Pagos",        color: "#f76f6f", items: [{ label:"Provincia.Net",hi:true},{ label:"Mercado Pago",hi:true},{ label:"Interbanking",hi:true},{ label:"Google Maps",hi:false},{ label:"Binance API",hi:false},{ label:"Twilio",hi:false},{ label:"Telegram Bot",hi:false}] },
    { title: "DevOps & Tooling",    color: "#4f8ef7", items: [{ label:"Docker",hi:true},{ label:"Git/GitLab",hi:false},{ label:"Vercel",hi:false},{ label:"SheetJS",hi:false},{ label:"JasperReports",hi:false}] }
  ],
  projects: [
    { id:1,  title:"API Gateway Municipal",               desc:"API REST Laravel que centraliza expedientes, personas, RRHH y GIS con autenticación dual LDAP + JWT.",                                             type:"Microservicios", category:"municipal", stack:["Laravel","PHP","JWT","LDAP","SQL Server","MySQL"],         color:"#f76f6f" },
    { id:2,  title:"API Facturador Municipal",            desc:"Microservicio Lumen para emisión y consulta de facturas municipales por número, sistema, clave o CUIT.",                                           type:"API",            category:"municipal", stack:["Lumen","PHP","SQL Server","MySQL","REST API"],              color:"#f7b155" },
    { id:3,  title:"Portal de Tasas y Débito",           desc:"Plataforma para consulta de deuda, adhesión al débito automático bancario y pago online. Doble autenticación: empleados y ciudadanos.",             type:"Full Stack",     category:"municipal", stack:["Laravel","Blade","SQL Server","Provincia.Net","Mercado Pago"], color:"#3dd68c" },
    { id:4,  title:"Portal de Proveedores",              desc:"Autogestión de proveedores municipales: alta, validación CUIT, actualización de email con token, adjuntos y consulta de pagos.",                    type:"Full Stack",     category:"municipal", stack:["Laravel","PHP","SQL Server","MySQL","Token Email"],        color:"#38c5d9" },
    { id:5,  title:"Sistema de Permisos (Alfa)",         desc:"Administración de usuarios y permisos granulares para todas las apps municipales. Auth LDAP corporativo y reportes JasperReports.",                 type:"Backend",        category:"municipal", stack:["Laravel","LDAP","SQL Server","JasperReports"],             color:"#b07ef7" },
    { id:6,  title:"Presupuesto Participativo",          desc:"Plataforma de votación online para vecinos de Morón: inscripción, proyectos por categoría, votos y panel de admin con resultados en tiempo real.",  type:"Full Stack",     category:"municipal", stack:["Node.js","Express","SQL Server","EJS","Docker"],           color:"#4f8ef7" },
    { id:7,  title:"Gestión Urbana con Mapas",           desc:"Panel web para publicidades georeferenciadas con Google Maps, roles de acceso, exportación Excel/PDF y Docker.",                                    type:"Full Stack",     category:"municipal", stack:["React","Chakra UI","Google Maps","SheetJS","Docker"],      color:"#3dd68c", github:"https://github.com/Izirae/boton_front" },
    { id:8,  title:"Dolarines — Monitor USDT/ARS",       desc:"Bot multi-usuario TypeScript: monitorea USDT/ARS en Binance y notifica por Telegram, Email y WhatsApp con análisis de mercado y clima.",            type:"Bot",            category:"personal",  stack:["TypeScript","Node.js","Telegram","Twilio","Binance","SQLite"],color:"#b07ef7" },
    { id:9,  title:"Fold-A-Desk E-commerce",             desc:"Tienda online React con catálogo, carrito, checkout Mercado Pago y Firebase. Desplegada en Vercel.",                                                type:"Frontend",       category:"personal",  stack:["React","Tailwind","Firebase","Mercado Pago","Vercel"],     color:"#38c5d9", github:"https://github.com/Izirae/Fold-a-desk" },
    { id:10, title:"Mantenimiento Minero",               desc:"Sistema full-stack para gestión de mantenimiento preventivo de equipos mineros: dashboard, planes y órdenes de trabajo.",                           type:"Full Stack",     category:"personal",  stack:["React","Vite","Node.js","Express","REST API"],             color:"#f7b155" },
    { id:11, title:"Grilla de Horarios DnD",             desc:"App React para armar grillas de horarios/turnos con drag & drop entre columnas. Styled Components + Vite.",                                         type:"Frontend",       category:"personal",  stack:["React","react-beautiful-dnd","Styled Components","Vite"],  color:"#4f8ef7" },
    { id:12, title:"API Gestión de Usuarios JWT",        desc:"API con autenticación JWT stateless, subida de archivos Multer y CORS para SPA y apps móviles.",                                                    type:"Backend",        category:"personal",  stack:["Node.js","Express","JWT","Sequelize","MySQL"],             color:"#f76f6f" }
  ]
}
