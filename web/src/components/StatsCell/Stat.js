import theme from 'src/theme'

const Stat = ({ value, label, unit, ...props }) => (
  <div className="stat" {...props}>
    <span className="stat__value">
      {value}
    </span>
    {label && <span className="stat__label" children={label} />}
    <style jsx>{`
      .stat {
        text-align: center;
      }
      .stat__value {
        display: block;
        font-size: 4rem;
        line-height: 1;
        margin-bottom: 0.5rem;
      }
      .stat__label {
        color: ${theme.colors.muted};
        font-size: 0.875rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }
    `}</style>
  </div>
)

export default Stat
