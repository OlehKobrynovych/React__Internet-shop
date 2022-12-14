
export const datas = {
    shopInfo: {
        id: '1',
        language: 'UA',  // Щоб поміняти мову потрібно вписати 'UA' або 'ENG'
        selectedCurrency: '€',  // Щоб поміняти валюту потрібно вписати '₴' або '€'
        name: 'Dnipro',
        facebook: 'https://www.facebook.com',
        instagram: 'https://www.instagram.com/',
        contact_number: '+38 (067) 380-41-11',
        contact_number_two: '+38 (067) 380-41-11',
        location: 'м.Рівне, Фабрична, 12',
        deliveryMethods: 'Самовивіз з магазину або службами доставки Нова Пошта',
        paymentMethods: 'Ви можете оплатити  товар на сайті або за реквізитами',
        guarantee: 'Обмін\повернення товару протягом 14 днів',
    },
    categories: [
        {
            name: 'Унісекс',
	        href: '/unisex',
	        id: '1',
            subCategories: [
                {
                    name: 'Унісекс',
                    href: '/unisex/unisex',
                    id: '1'
                }
            ],
        },
        {
            name: 'Чоловікам',
	        href: '/man',
	        image: 'asdasd',
	        id: '2',
            subCategories: [
                {
                    name: 'Штани',
                    href: '/man/pants',
                    id: '1'
                },
                {
                    name: 'Шапки',
                    href: '/man/hats',
                    id: '2'
                },
                {
                    name: 'Куртки',
                    href: '/man/camisole',
                    id: '3'
                },
                {
                    name: 'Сорочки',
                    href: '/man/jackets',
                    id: '4'
                },
            ],
        },
        {
            name: 'Жінкам',
	        href: '/woman',
	        image: 'asdasd',
	        id: '3',
            subCategories: [
                {
                    name: 'Штани',
                    href: '/woman/pants',
                    id: '1'
                },
                {
                    name: 'Шапки',
                    href: '/woman/hats',
                    id: '2'
                },
                {
                    name: 'Куртки',
                    href: '/woman/camisole',
                    id: '3'
                },
                {
                    name: 'Сорочки',
                    href: '/woman/jackets',
                    id: '4'
                },
                {
                    name: 'Шкарпетки',
                    href: '/woman/socks',
                    id: '5'
                },
            ],
        },
        {
            name: 'Дітям',
	        href: '/children',
	        image: 'asdasd',
	        id: '4',
            subCategories: [
                {
                    name: 'Штани',
                    href: '/children/pants',
                    id: '1'
                },
                {
                    name: 'Шапки',
                    href: '/children/hats',
                    id: '2'
                },
                {
                    name: 'Куртки',
                    href: '/children/camisole',
                    id: '3'
                },
                {
                    name: 'Сорочки',
                    href: '/children/jackets',
                    id: '4'
                },
                {
                    name: 'одяг',
                    href: '/children/clothing',
                    id: '5'
                },
            ],
        },
        {
            name: 'Колекції',
	        href: '/collections',
	        image: 'asdasd',
	        id: '5',
            subCategories: [
                {
                    name: 'Штани',
                    href: '/collections/pants',
                    id: '1'
                },
                {
                    name: 'Шапки',
                    href: '/collections/hats',
                    id: '2'
                },
                {
                    name: 'Куртки',
                    href: '/collections/camisole',
                    id: '3'
                },
                {
                    name: 'Сорочки',
                    href: '/collections/jackets',
                    id: '4'
                },
            ],
        },
        {
            name: 'Знижки',
	        href: '/discounts',
	        image: 'asdasd',
	        id: '6',
            subCategories: [
                {
                    name: 'Штани',
                    href: '/discounts/pants',
                    id: '1'
                },
                {
                    name: 'Шапки',
                    href: '/discounts/hats',
                    id: '2'
                },
                {
                    name: 'Куртки',
                    href: '/discounts/camisole',
                    id: '3'
                },
                {
                    name: 'Сорочки',
                    href: '/discounts/jackets',
                    id: '4'
                },
            ],
        },
    ],
    
    products: [
        {
            id: '1',
            name: 'Джинси',
            price: 110,
            image: '/images/photo1.webp',
            new_price: 90,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '2',
            name: 'Сорочка',
            price: 100,
            image: '/images/photo1.webp',
            new_price: 90,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '3',
            name: 'Джинси',
            price: 500,
            image: '/images/photo1.webp',
            new_price: 90,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '4',
            name: 'Куртка',
            price: 180,
            image: '/images/photo1.webp',
            new_price: 90,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '5',
            name: 'Джинси',
            price: 100,
            image: '/images/photo1.webp',
            new_price: 90,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '6',
            name: 'Джинси',
            price: 100,
            image: '/images/photo1.webp',
            new_price: 90,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '7',
            name: 'Джинси',
            price: 100,
            image: '/images/photo1.webp',
            new_price: null,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '8',
            name: 'Сорочка',
            price: 100,
            image: '/images/photo1.webp',
            new_price: null,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '9',
            name: 'Джинси',
            price: 100,
            image: '/images/photo1.webp',
            new_price: null,
            category: 'Жінкам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '10',
            name: 'Куртка',
            price: 100,
            image: '/images/photo1.webp',
            new_price: null,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '11',
            name: 'Джинси',
            price: 100,
            image: '/images/photo1.webp',
            new_price: null,
            category: 'Жінкам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '12',
            name: 'Джинси',
            price: 100,
            image: '/images/photo1.webp',
            new_price: null,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
               {
            id: '13',
            name: 'Джинси',
            price: 100,
            image: '/images/photo1.webp',
            new_price: 90,
            category: 'Жінкам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '14',
            name: 'Сорочка',
            price: 100,
            image: '/images/photo1.webp',
            new_price: 90,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '15',
            name: 'Джинси',
            price: 100,
            image: '/images/photo1.webp',
            new_price: 90,
            category: 'Жінкам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '16',
            name: 'Куртка',
            price: 100,
            image: '/images/photo1.webp',
            new_price: 90,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '17',
            name: 'Джинси',
            price: 100,
            image: '/images/photo1.webp',
            new_price: 90,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '18',
            name: 'Джинси',
            price: 100,
            image: '/images/photo1.webp',
            new_price: 90,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '19',
            name: 'Джинси',
            price: 100,
            image: '/images/photo1.webp',
            new_price: null,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '20',
            name: 'Сорочка',
            price: 100,
            image: '/images/photo1.webp',
            new_price: null,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '21',
            name: 'Джинси',
            price: 100,
            image: '/images/photo1.webp',
            new_price: null,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '22',
            name: 'Куртка',
            price: 100,
            image: '/images/photo1.webp',
            new_price: null,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '23',
            name: 'Джинси',
            price: 100,
            image: '/images/photo1.webp',
            new_price: null,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        {
            id: '24',
            name: 'Джинси',
            price: 100,
            image: '/images/photo1.webp',
            new_price: null,
            category: 'Чоловікам',
            subCategory: 'Штани',
            description: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
            size: 'L XL XXL',
            imageArr: [
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
                '/images/photo1.webp',
            ]
        },
        // {
        //     id: '25',
        //     name: 'Джинси',
        //     price: 100,
        //     image: '/images/photo1.webp',
        //     new_price: 90
        // },
        // {
        //     id: '26',
        //     name: 'Сорочка',
        //     price: 100,
        //     image: '/images/photo1.webp',
        //     new_price: 90
        // },
        // {
        //     id: '27',
        //     name: 'Джинси',
        //     price: 100,
        //     image: '/images/photo1.webp',
        //     new_price: 90
        // },
        // {
        //     id: '28',
        //     name: 'Сорочка',
        //     price: 100,
        //     image: '/images/photo1.webp',
        //     new_price: null
        // },
        // {
        //     id: '29',
        //     name: 'Джинси',
        //     price: 100,
        //     image: '/images/photo1.webp',
        //     new_price: null
        // },
        // {
        //     id: '30',
        //     name: 'Куртка',
        //     price: 100,
        //     image: '/images/photo1.webp',
        //     new_price: null
        // },
        // {
        //     id: '31',
        //     name: 'Джинси',
        //     price: 100,
        //     image: '/images/photo1.webp',
        //     new_price: null
        // },
        // {
        //     id: '32',
        //     name: 'Джинси',
        //     price: 100,
        //     image: '/images/photo1.webp',
        //     new_price: null
        // },
        // {
        //     id: '33',
        //     name: 'Джинси',
        //     price: 100,
        //     image: '/images/photo1.webp',
        //     new_price: 90
        // },
    ] 
}

