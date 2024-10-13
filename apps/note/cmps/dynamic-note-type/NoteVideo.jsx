const { useRef, useEffect, useState } = React

export function NoteVideo({ info = { videoSrc: '', txt: '' }, onChangeInfo, onToggleEditModal, id }) {
    const inputRef = useRef(null)
    const [videoSrc, setVideoSrc] = useState(info.videoSrc || '')

    const isEditable = typeof onChangeInfo === 'function'
    const editClass = isEditable ? 'editable' : ''

    function isYouTubeUrl(url) {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
        return youtubeRegex.test(url)
    }

    function getYouTubeVideoId(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        const matches = url.match(regex)
        return matches ? matches[1] : null
    }

    function handleVideoUrlChange({ target }) {
        const url = target.value
        setVideoSrc(url)
        onChangeInfo({ ...info, videoSrc: url })
    }

    function handleFileChange(ev) {
        const file = ev.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setVideoSrc(e.target.result)
                onChangeInfo({ ...info, videoSrc: e.target.result }) 
            }
            reader.readAsDataURL(file)
        }
    }

    function getDefaultUrl(ev) {
        ev.target.src = 'https://via.placeholder.com/150'
    }

    function handleClick(ev) {
        if (ev.target.tagName === 'INPUT') return
        if (typeof onToggleEditModal === 'function') {
            onToggleEditModal(id)
        }
    }

    useEffect(() => {
        if (isEditable && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isEditable])

    const { txt } = info
    return (
        <section className={`note-video ${editClass}`} onClick={handleClick}>
            {isEditable ? (
                <div className="note-input">
                    {isYouTubeUrl(videoSrc) ? (
                        <iframe
                            id={`youtube-iframe-${id}`}
                            name={`youtube-video-${id}`}
                            src={`https://www.youtube-nocookie.com/embed/${getYouTubeVideoId(videoSrc)}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <video src={videoSrc} controls onError={getDefaultUrl} />
                    )}
                </div>
            ) : (
                <div>
                    {isYouTubeUrl(videoSrc) ? (
                        <iframe
                            id={`youtube-iframe-${id}`}
                            name={`youtube-video-${id}`}
                            src={`https://www.youtube-nocookie.com/embed/${getYouTubeVideoId(videoSrc)}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <video src={videoSrc} controls onError={getDefaultUrl} />
                    )}
                    <p>{txt}</p>
                </div>
            )}
        </section>
    )
}