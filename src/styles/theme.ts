const defaultTheme = {
  colors:{
    gray_100:  '#231f20',
    gray_200:  '#333139',
    gray_300:  '#343143',
    gray_400:  '#2A2945',
    gray_500:  '#141A44',
    gray_600:  '#38385B',
    gray_700:  '#5C5977',
    gray_800:  '#858199',
    gray_900:  '#B8B5C4',
    gray_1000: '#E4E2F1',
    white:     '#FBFAFF',

    main: '#243E92',
    primary: '#243E92',
    secondary: '#FAA943',

    alert: '#2E7CB7',
    danger: '#F05223',
    success:'#78C145',

  },
  texts:{
    main_title: '700 2.875rem/3.125rem EB Garamond, sans-serif', // h1
    title: '700 1.875rem/2.125rem EB Garamond, sans-serif', // h2
    sub_title: '700 1.25rem/1.5rem EB Garamond, sans-serif', // h3
    main_text: '400 1.25rem/1.5rem EB Garamond, sans-serif', // p, a ...
    main_strong: '600 1.25rem/1.5rem EB Garamond, sans-serif', // strong
    small_text: '400 0.875rem/1rem EB Garamond, sans-serif', // p, a, small ..
  }
}

export type ThemeType = typeof defaultTheme
export default defaultTheme
