/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fdf2f8',  // 浅粉色
                    100: '#fce7f3',  // 稍深的浅粉色
                    200: '#fbcfe8',  // 温暖的粉色
                    300: '#f9a8d4',  // 略带紫色调的粉色
                    400: '#f472b6',  // 更深一点的粉色
                    500: '#ec4899',  // 明亮的粉红色
                    600: '#db2777',  // 强烈的粉红色
                    700: '#be185d',  // 深粉色
                    800: '#9d1752',  // 深紫粉色
                    900: '#831843',  // 暗粉色
                }
            },
            keyframes: {
                messageIn: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
            animation: {
                'message': 'messageIn 0.3s ease-out forwards',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
