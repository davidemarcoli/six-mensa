export default function LoadingSpinner() {
    return (
        <div className="loading">
            <svg className="loader" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle className={"circleLoader"} cx="50" cy="50" r="40" strokeLinecap="round"/>
            </svg>
        </div>
    );
}