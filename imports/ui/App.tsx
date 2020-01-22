import React from 'react';
import Hello from './Hello';

// import Layout from './Layout'
type AppProps = {
  msg: string
}
// declare global {
//   interface Window { analytics: SegmentAnalytics.AnalyticsJS; }
// }

export default class App extends React.Component<{}, AppProps> {
  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
    window && window.analytics ? window.analytics.page() : ''
  }

  render() {
    return (
      <div>
        <Hello />
      </div>

    )
  }
}
