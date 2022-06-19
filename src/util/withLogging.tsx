import React, { useEffect } from "react";

export interface WithLoggingProps {
  loggingPrefix: string
}

// the wrapped component will log its name along with a prefix every time it mounts
export function withLogging<T extends WithLoggingProps>(Component: React.ComponentType<T>): React.ComponentType<T> {
  const ComponentWithLogging: React.ComponentType<T> = (props: T) => {
    const name = ComponentWithLogging.displayName || ComponentWithLogging.name || 'Component'

    useEffect(() => {
      console.log(`${props.loggingPrefix} ${name}`)
    }, [props.loggingPrefix])

    return <Component {...props} />
  }
  ComponentWithLogging.displayName = Component.displayName || Component.name || 'Component'
  return ComponentWithLogging
}
