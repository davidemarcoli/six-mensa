import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

export async function GET() {
    const image = await fetch(new URL('../../public/images/six-logo.png', import.meta.url)).then(
        (res) => res.arrayBuffer(),
    );

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    background: 'hsl(222.2 84% 4.9%)',
                    width: '100%',
                    height: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/*@ts-ignore*/}
                <img width="410" height="150" src={image} />
                <p style={{
                    fontSize: 100,
                    marginLeft: '50px',
                    color: 'white',
                }}>Mensa</p>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}