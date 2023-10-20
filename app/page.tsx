async function getImages(searchTerm: string) {
    return await fetch('http://localhost:3000/api/scrape/cheerio/', {
        method: 'POST',
        body: JSON.stringify({searchTerm})
    }).then((response) => response.json());
}

export const revalidate = 10;

export default async function Home() {

    const images = await getImages('donald duck');

    return (
        <>
            {/*<p>{JSON.stringify(images)}</p>*/}
            {images.map((image: any, i: number) => {
                console.log(image)
                return (
                    <img key={i} src={image.original} alt=""/>
                )
            })}
        </>
    )
}
