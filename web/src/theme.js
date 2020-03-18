const fonts = `system-ui, -apple-system, BlinkMacSystemFont,
'Segoe UI', 'Roboto', 'Helvetica Neue', Helvetica, sans-serif`

const theme = {
  colors: {
    dark: '#1e1e1e',
    snow: '#eaeaea',
    muted: '#666',
    red: '#e55934',
    orange: '#fa7921',
    yellow: '#fde74c',
    green: '#9bc53d',
    blue: '#5a85ea',

    chn: '#e95380',
    deu: '#2895b0',
    esp: '#8e77ee',
    fra: '#c05dea',
    gbr: '#666',
    irn: '#ab8327',
    itl: '#7c9221',
    kor: '#e95380',
    usa: '#3e25a3'
  },
  fonts: {
    sans: `'Gotham Rounded SSm A', 'Gotham Rounded SSm B', ${fonts}`,
    serif: `Sentinel, ${fonts}`,
    system: fonts
  }
}

export default theme
