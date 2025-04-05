export default function Releases(
    props: {
        monster: any,
    }){
    return (
        <div className="p-4">
            <iframe src={`https://open.spotify.com/embed/${props.monster.spotifyUrl}`}  allowFullScreen width="100%" height="360" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="One Word"/>
        </div>
    )
}