export const recipeList = [
    {
        "name": "Fried Rice",
        "favorite": true,
        "date": "2025-4-12",
        "output": {
            "portions": 4,
            "output": "Portions"
        },
        "ingredients": [
            {
                "product": "Riisi",
                "quantity": 200,
                "unit": "g"
            },
            {
                "product": "Vegemix",
                "quantity": 400,
                "unit": "g"
            },
            {
                "product": "Soija",
                "quantity": 0.5,
                "unit": "dl"
            },
            {
                "product": "Sambal Oelek",
                "quantity": 10,
                "unit": "g"
            },
            {
                "product": "P\u00e4hkin\u00e4",
                "quantity": 50,
                "unit": "g"
            }
        ],
        "instructions": [
            "Keit\u00e4 riisi",
            "Paista veget",
            "Tee maustetahna",
            "Lis\u00e4\u00e4 riisi ja maustetahna pannulle",
            "Lis\u00e4\u00e4 p\u00e4hkin\u00e4t"
        ],
        "prepTime": {
            "time": 20,
            "format": "minute(s)"
        },
        "id": 1
    },
    {
        "name": "Sweet N Sour Chicken",
        "favorite": false,
        "date": "2025-2-5",
        "output": {
            "portions": 4,
            "output": "Portions"
        },
        "ingredients": [
            {
                "product": "Chicken",
                "quantity": 450,
                "unit": "g"
            },
            {
                "product": "Ketchup",
                "quantity": 100,
                "unit": "g"
            },
            {
                "product": "Soy",
                "quantity": 0.5,
                "unit": "dl"
            },
            {
                "product": "Water",
                "quantity": 0.5,
                "unit": "dl"
            },
            {
                "product": "Syrup",
                "quantity": 20,
                "unit": "g"
            }
        ],
        "instructions": [
            "Dice the chicken",
            "Mix up soy, ketchup, water and syrup",
            "Fry the chicken, when done take out of pan",
            "Pour the mixture on pan and let reduce a little, before putting chicken back"
        ],
        "prepTime": {
            "time": 15,
            "format": "minute(s)"
        },
        "id": 2
    },
    {
        "name": "Lihaliemi",
        "favorite": true,
        "date": "2023-4-12",
        "output": {
            "portions": 10,
            "output": "Portions"
        },
        "ingredients": [
            {
                "product": "Vesi",
                "quantity": 5,
                "unit": "litre"
            },
            {
                "product": "Keittoluut",
                "quantity": 2,
                "unit": "kg"
            },
            {
                "product": "Juurekset",
                "quantity": 2,
                "unit": "kg"
            }
        ],
        "instructions": [
            "Paahda luut ja juurekset",
            "Lis\u00e4\u00e4 luut ja juurekset kylm\u00e4\u00e4n veteen",
            "Kiehauta, redusoi ja kuori vaahtoa"
        ],
        "prepTime": {
            "time": 60,
            "format": "minute(s)"
        },
        "id": 3
    },
    {
        "name": "Skagenr\u00f6ra",
        "favorite": false,
        "date": "2020-12-12",
        "output": {
            "portions": 4,
            "output": "Portions"
        },
        "ingredients": [
            {
                "product": "Kr\u00e4ft\u00f6r",
                "quantity": 800,
                "unit": "g"
            },
            {
                "product": "Majonn\u00e4s",
                "quantity": 250,
                "unit": "g"
            },
            {
                "product": "Dill",
                "quantity": 80,
                "unit": "g"
            },
            {
                "product": "Grasl\u00f6k",
                "quantity": 80,
                "unit": "g"
            },
            {
                "product": "R\u00f6dl\u00f6k",
                "quantity": 80,
                "unit": "g"
            },
            {
                "product": "Citronsaft",
                "quantity": 0.5,
                "unit": "dl"
            },
            {
                "product": "Salta",
                "quantity": 10,
                "unit": "g"
            }
        ],
        "instructions": [
            "Hanga kr\u00e4ft\u00f6r",
            "Chop chop gr\u00f6na och l\u00f6k",
            "Mixa majo, saftor och gr\u00f6na",
            "Mixa inne kr\u00e4ft\u00f6r och smaka"
        ],
        "prepTime": {
            "time": 40,
            "format": "minute(s)"
        },
        "id": 4
    }
]


export const basketList = [
    
]

export const dishList = [
    {
        "name":"Toast Skagen",
        "id": 1,
        "course":"Starter",
        "favorite": true,
        "components": [
            {
                "name":"Skagenröra",
                "ingredients": [
                    {
                        "product": "Kr\u00e4ft\u00f6r",
                        "quantity": 800,
                        "unit": "g"
                    },
                    {
                        "product": "Majonn\u00e4s",
                        "quantity": 250,
                        "unit": "g"
                    },
                    {
                        "product": "Dill",
                        "quantity": 80,
                        "unit": "g"
                    },
                    {
                        "product": "Grasl\u00f6k",
                        "quantity": 80,
                        "unit": "g"
                    },
                    {
                        "product": "R\u00f6dl\u00f6k",
                        "quantity": 80,
                        "unit": "g"
                    },
                    {
                        "product": "Citronsaft",
                        "quantity": 0.5,
                        "unit": "dl"
                    },
                    {
                        "product": "Salta",
                        "quantity": 10,
                        "unit": "g"
                    }
                ]
            }
        ]
    },
    {
        "name":"Chateubriand",
        "id": 2,
        "course":"Main",
        "favorite": false,
        "components": [
            {
                "name":"Punkkusoosi",
                "ingredients": [
                    {
                        "product": "Vesi",
                        "quantity": 5,
                        "unit": "litre"
                    },
                    {
                        "product": "Keittoluut",
                        "quantity": 2,
                        "unit": "kg"
                    },
                    {
                        "product": "Juurekset",
                        "quantity": 2,
                        "unit": "kg"
                    },
                    {
                        "product": "Punaviini",
                        "quantity": 2,
                        "unit": "l"
                    }
                ]
            },
            {
                "name":"Beef Tenderloin",
                "ingredients": [
                    {
                        "product": "Beef Tenderloin",
                        "quantity": 140,
                        "unit": "g"
                    },
                ]
            }
        ]
    },
]