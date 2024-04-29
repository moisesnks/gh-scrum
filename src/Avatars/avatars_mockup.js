const avatars =
    [
        {
            "name": "MANUEL ALEJANDRO LUQUE TREUPIL",
            "email": "mluque@utem.cl",
        },
        {
            "name": "JOSÉ BRAULIO MALCA RODRIGUEZ",
            "email": "jmalca@utem.cl",
        },
        {
            "name": "ENOC CAMIL GARCIA DE LA HUERTA SARIEGO",
            "email": "egarciadelahuerta@utem.cl",
        },
        {
            "name": "CRISTOBAL ANDRES MARTINEZ SOPERREY",
            "email": "cmartinezs@utem.cl",
        },
        {
            "name": "LUCAS BENJAMIN DROGUETT GARATE",
            "email": "ldroguett@utem.cl",
        },
        {
            "name": "PABLO IVÁN VARGAS MAGNANI",
            "email": "pvargasm@utem.cl",
        },
        {
            "name": "IVAN ALEJANDRO SILVA RODRIGUEZ",
            "email": "isilvaro@utem.cl",
        },
        {
            "name": "BENJAMÍN HERNÁN ABARCA CÁCERES",
            "email": "babarca@utem.cl",
        },
        {
            "name": "FABIÁN GERARDO YEFI CASTILLO",
            "email": "fyefi@utem.cl",
        },
        {
            "name": "MAURICIO YASSEL REYNOSO RUIZ",
            "email": "mreynoso@utem.cl",
        },
        {
            "name": "SIMON JESUS CARRASCO IBARRA",
            "email": "scarrascoi@utem.cl",
        },
        {
            "name": "Pablo Gálvez Hernández",
            "email": "pgalvez@utem.cl",
        },
        {
            "name": "ITALO ALEJANDRO ROJAS AREVALO",
            "email": "irojas@utem.cl",
        },
        {
            "name": "Nicolas edgardo enrique sepulveda catalan",
            "email": "Nsepulvedac@utem.cl",
        },
        {
            "name": "Gabriela Gonzalez",
            "email": "ggonzalezla@utem.cl",
        },
        {
            "name": "BRUNO ANDRÉS MIRANDA ESCOBAR",
            "email": "bmirandae@utem.cl",
        },
        {
            "name": "LUKAS LUIS MEDINA ROZAS",
            "email": "lmedinar@utem.cl",
        }
    ]

avatars.forEach((avatar) => {
    avatar.score = Math.floor(Math.random() * 0);
});

// Los nombres deben convertirse a minúsculas y sin espacios y la primera letra de cada palabra en mayúsculas
// Ejemplo: "MANUEL ALEJANDRO LUQUE TREUPIL" -> "Manuel Alejandro Luque Treupil"
// Ejemplo: "JOSÉ BRAULIO MALCA RODRIGUEZ" -> "José Braulio Malca Rodriguez"

avatars.forEach((avatar) => {
    const nameParts = avatar.name.split(' ');
    avatar.name = nameParts.map((part) => {
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    }).join(' ');
});

// Necesitamos una propiedad id para cada avatar, debe ser un string increment+1
// Ejemplo: "Manuel Alejandro Luque Treupil" -> "1"

avatars.forEach((avatar, index) => {
    avatar.id = (index + 1).toString();
});


export default avatars;