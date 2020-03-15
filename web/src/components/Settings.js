import theme from 'src/theme'

const Settings = ({ children }) => (
  <aside>
    {children}
    <style jsx global>{`
      aside h2 {
        margin-top: 1.5rem;
      }
      aside label {
        font-family: ${theme.fonts.serif};
        display: flex;
        align-items: center;
        padding-bottom: 0.5rem;
      }
      aside input {
        margin-right: 0.5rem;
      }
      aside select {
        display: block;
      }
    `}</style>
  </aside>
)

export default Settings
