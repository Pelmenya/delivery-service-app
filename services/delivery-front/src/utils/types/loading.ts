export interface LoadingType {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error?: string;
}
