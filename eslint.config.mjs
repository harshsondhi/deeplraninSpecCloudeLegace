import coreWebVitals from 'eslint-config-next/core-web-vitals'
import tsConfig from 'eslint-config-next/typescript'
import prettierRules from 'eslint-config-prettier'

const config = [...coreWebVitals, ...tsConfig, prettierRules]

export default config
