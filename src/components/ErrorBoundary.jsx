import React, { Component } from 'react'

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false } 
    }

    static getDerivedStateFromError(err) {
        // Update STATE if needed before next render
        return { hasError: true };
    }

    componentDidCatch(err, errInfo) {
        console.log(err, errInfo);
    }


  render() {
    if(this.state.hasError) {
        return <h1>Something went wrong!</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;