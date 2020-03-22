import theme from 'src/theme'

const Settings = ({ children }) => (
  <aside>
    {children}
    <style jsx global>{`
      aside h2 {
        margin-top: 1.5rem;
      }
      aside h2:first-child {
        margin-top: 0;
      }
      aside label {
        font-family: ${theme.fonts.serif};
        display: flex;
        align-items: center;
        padding-bottom: 0.5rem;
      }
      aside label:first-child {
        font-family: ${theme.fonts.sans};
        font-size: 1.5rem;
      }
      aside p {
        color: ${theme.colors.muted};
        font-family: ${theme.fonts.serif};
        font-size: 0.875rem;
        margin-top: 0.5rem;
      }
      aside input {
        margin-right: 0.5rem;
      }
      aside select {
        display: block;
        font-family: ${theme.fonts.system};
        font-size: 1.125rem;
      }
    `}</style>
  </aside>
)

export default Settings
