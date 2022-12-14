import React from 'react';
import { SpareUI } from '../../../components/spare-ui/spare-ui';

import { Nullable } from '../../../utils/types/nullable';

interface ErrorBoundaryProps {
    error?: Error;
    children?: Nullable<JSX.Element>;
}

interface ErrorBoundaryState {
    hasError: boolean;
    errorInChildren: string;
    children?: Nullable<JSX.Element>;
}

export class ErrorBoundary extends React.Component<
ErrorBoundaryProps,
ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            errorInChildren: '',
        };
    }

    static getDerivedStateFromError = (error: Error) => ({
        hasError: true,
        errorInChildren: error.message,
    });

    render() {
        const { hasError, errorInChildren } = this.state;
        if (hasError) {
            if (errorInChildren !== null) {
                // Можно отрендерить запасной UI произвольного вида
                return (
                    <SpareUI
                        errorMessage={
                            this.state.errorInChildren
                        }
                    />
                );
            }
        }
        return this.props.children;
    }
}
