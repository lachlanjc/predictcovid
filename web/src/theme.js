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
    blue: '#5bc0eb',

    chn: '#e55934',
    deu: '#239b77',
    esp: '#e742c6',
    fra: '#c05dea',
    gbr: '#666',
    irn: '#ab8327',
    itl: '#479b23',
    kor: '#e95380',
    usa: '#5a85ea'
  },
  fonts: {
    sans: `'Gotham Rounded SSm A', 'Gotham Rounded SSm B', ${fonts}`,
    serif: `Sentinel, ${fonts}`,
    system: fonts
  }
}

export default theme
