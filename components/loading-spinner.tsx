import useStore from "@/lib/store";

export default function LoadingSpinner() {

    const {color} = useStore();

    return (
        <div className="loading">
            <svg className="loader" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle style={{stroke: color}} className={"circleLoader"} cx="50" cy="50" r="40" strokeLinecap="round"/>
            </svg>
        </div>
    );
}