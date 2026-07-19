export const portfolioData = {
  personal: {
    name: "Tu Nombre",
    role: "Full Stack Developer",
    location: "Buenos Aires, Argentina",
    github: "https://github.com/Izirae",
    email: "tu@email.com",
    linkedin: "https://linkedin.com/in/tu-perfil",
    bio: [
      "Desarrollo aplicaciones web completas para el sector público y privado. En la Municipalidad de Morón diseñé y mantuve un ecosistema de microservicios PHP/Laravel que integra sistemas legados como RAFAM, Oracle y PNET con portales web modernos para miles de ciudadanos.",
      "También construyo productos propios: bots de mensajería con TypeScript, e-commerce con React + Firebase y plataformas de gestión sectorial. Me interesa resolver problemas reales con código limpio y arquitecturas simples."
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
    { title: "Bases de datos",      color: "#f7b155", items: [{ label:"MySQL",hi:true},{ label:"Oracle DB",hi:true},{ label:"SQLite",hi:false},{ label:"Firebase",hi:false}] },
    { title: "APIs & Pagos",        color: "#f76f6f", items: [{ label:"Mercado Pago",hi:true},{ label:"Interbanking",hi:true},{ label:"Google Maps",hi:false},{ label:"Binance API",hi:false},{ label:"Twilio",hi:false},{ label:"Telegram Bot",hi:false}] },
    { title: "DevOps & Tooling",    color: "#4f8ef7", items: [{ label:"Docker",hi:true},{ label:"Git/GitLab",hi:false},{ label:"Vercel",hi:false},{ label:"SheetJS",hi:false},{ label:"JasperReports",hi:false}] }
  ],
  projects: [
    { id:1,  title:"API Gateway Municipal",               desc:"API REST Laravel que centraliza RAFAM, expedientes, personas, RRHH y GIS con autenticación dual LDAP + JWT.",                                      type:"Microservicios", category:"municipal", stack:["Laravel","PHP","JWT","LDAP","Oracle","MySQL"],              color:"#f76f6f" },
    { id:2,  title:"API Facturador Municipal",            desc:"Microservicio Lumen para emisión y consulta de facturas municipales por número, sistema, clave o CUIT.",                                           type:"API",            category:"municipal", stack:["Lumen","PHP","MySQL","REST API"],                           color:"#f7b155" },
    { id:3,  title:"Portal de Tasas y Débito",           desc:"Plataforma para consulta de deuda, adhesión al débito automático bancario y pago online. Doble autenticación: empleados y ciudadanos.",             type:"Full Stack",     category:"municipal", stack:["Laravel","Blade","MySQL","Mercado Pago"],                  color:"#3dd68c" },
    { id:4,  title:"Portal de Proveedores",              desc:"Autogestión de proveedores municipales: alta, validación CUIT, actualización de email con token, adjuntos y consulta de pagos.",                    type:"Full Stack",     category:"municipal", stack:["Laravel","PHP","MySQL","Token Email"],                     color:"#38c5d9" },
    { id:5,  title:"Sistema de Permisos (Alfa)",         desc:"Administración de usuarios y permisos granulares para todas las apps municipales. Auth LDAP corporativo y reportes JasperReports.",                 type:"Backend",        category:"municipal", stack:["Laravel","LDAP","MySQL","JasperReports"],                  color:"#b07ef7" },
    { id:6,  title:"Presupuesto Participativo",          desc:"Plataforma de votación online para vecinos de Morón: inscripción, proyectos por categoría, votos y panel de admin con resultados en tiempo real.",  type:"Full Stack",     category:"municipal", stack:["Node.js","Express","MySQL","EJS","Docker"],                color:"#4f8ef7" },
    { id:7,  title:"Gestión Urbana con Mapas",           desc:"Panel web para publicidades georeferenciadas con Google Maps, roles de acceso, exportación Excel/PDF y Docker.",                                    type:"Full Stack",     category:"municipal", stack:["React","Chakra UI","Google Maps","SheetJS","Docker"],      color:"#3dd68c", github:"https://github.com/Izirae/boton_front" },
    { id:8,  title:"Dolarines — Monitor USDT/ARS",       desc:"Bot multi-usuario TypeScript: monitorea USDT/ARS en Binance y notifica por Telegram, Email y WhatsApp con análisis de mercado y clima.",            type:"Bot",            category:"personal",  stack:["TypeScript","Node.js","Telegram","Twilio","Binance","SQLite"],color:"#b07ef7" },
    { id:9,  title:"Fold-A-Desk E-commerce",             desc:"Tienda online React con catálogo, carrito, checkout Mercado Pago y Firebase. Desplegada en Vercel.",                                                type:"Frontend",       category:"personal",  stack:["React","Tailwind","Firebase","Mercado Pago","Vercel"],     color:"#38c5d9", github:"https://github.com/Izirae/Fold-a-desk" },
    { id:10, title:"Mantenimiento Minero",               desc:"Sistema full-stack para gestión de mantenimiento preventivo de equipos mineros: dashboard, planes y órdenes de trabajo.",                           type:"Full Stack",     category:"personal",  stack:["React","Vite","Node.js","Express","REST API"],             color:"#f7b155" },
    { id:11, title:"Grilla de Horarios DnD",             desc:"App React para armar grillas de horarios/turnos con drag & drop entre columnas. Styled Components + Vite.",                                         type:"Frontend",       category:"personal",  stack:["React","react-beautiful-dnd","Styled Components","Vite"],  color:"#4f8ef7" },
    { id:12, title:"API Gestión de Usuarios JWT",        desc:"API con autenticación JWT stateless, subida de archivos Multer y CORS para SPA y apps móviles.",                                                    type:"Backend",        category:"personal",  stack:["Node.js","Express","JWT","Sequelize","MySQL"],             color:"#f76f6f" }
  ]
}
