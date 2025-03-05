import React, { useEffect, useRef, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Music() {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const lightRef = useRef(null); // Ref for light div to directly manipulate styles
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Track the current song index
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false); // Track if the song has started playing
  const [currentTime, setCurrentTime] = useState(0); // Track the current time of the song
  const [duration, setDuration] = useState(0); // Track the duration of the song
  const [volume, setVolume] = useState(0); // Track volume for color effect
  const [isRepeat, setIsRepeat] = useState(false); // Repeat functionality state
  const [isShuffle, setIsShuffle] = useState(false); // Shuffle functionality state

  const getColorFromVolume = (volume) => {
    const amplifiedVolume = Math.min(volume * 2, 255);
    const r = amplifiedVolume < 128 ? amplifiedVolume * 2 : 255;
    const g =
      amplifiedVolume < 128
        ? amplifiedVolume * 2
        : 255 - (amplifiedVolume - 128) * 2;
    const b = amplifiedVolume < 128 ? 255 - amplifiedVolume * 2 : 0;

    return { r, g, b };
  };

  const initializeAudio = () => {
    if (!audioContextRef.current && audioRef.current) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioRef.current);

      source.connect(analyser);
      analyser.connect(audioContext.destination);

      analyser.fftSize = 256;

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateLights = () => {
        analyser.getByteFrequencyData(dataArray);
        const newVolume = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
        setVolume(newVolume); // Update volume state

        const { r, g, b } = getColorFromVolume(newVolume);

        if (lightRef.current) {
          lightRef.current.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.2)`;
          lightRef.current.style.boxShadow = `0 0 ${newVolume * 2}px ${newVolume / 5}px rgba(${r}, ${g}, ${b}, 0.9)`;
        }

        requestAnimationFrame(updateLights);
      };

      updateLights();
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      initializeAudio();
      if (audioContextRef.current?.state === "suspended") {
        audioContextRef.current.resume();
      }
      audioRef.current.play();
      setIsPlaying(true);
      setHasStartedPlaying(true); // Mark that playback has started
    }
  };

  const handleSongEnd = () => {
    let nextSongIndex;
    if (isRepeat) {
      audioRef.current.play(); // Repeat the same song
    } else {
      if (isShuffle) {
        // Ensure the random index is different from the current song index
        do {
          nextSongIndex = Math.floor(Math.random() * songs.length);
        } while (nextSongIndex === currentSongIndex); // Keep generating until it's different
      } else {
        nextSongIndex = (currentSongIndex + 1) % songs.length;
      }
      setCurrentSongIndex(nextSongIndex);
    }
  };

  const handleNextSong = () => {
    let nextSongIndex;
    if (isShuffle) {
      // Ensure the random index is different from the current song index
      do {
        nextSongIndex = Math.floor(Math.random() * songs.length);
      } while (nextSongIndex === currentSongIndex); // Keep generating until it's different
    } else {
      nextSongIndex = (currentSongIndex + 1) % songs.length;
    }

    setCurrentSongIndex(nextSongIndex);
  };

  const handlePreviousSong = () => {
    const prevSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevSongIndex);
  };

  const handleProgressChange = (event) => {
    const newTime = event.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    const songList = [
      "love story.mp3",
      "set fire to the rain.mp3",
      "cheap thrills.mp3",
    ];
    setSongs(songList);
  }, []);

  useEffect(() => {
    if (songs.length > 0) {
      audioRef.current.src = `/music/${songs[currentSongIndex]}`;

      if (hasStartedPlaying) {
        audioRef.current.play(); // Automatically play the song if it has started playing before
      }
    }
  }, [currentSongIndex, songs, hasStartedPlaying]);

  useEffect(() => {
    const updateProgress = () => {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  useEffect(() => {
    initializeAudio();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px"}}>
      <audio
        ref={audioRef}
        onEnded={handleSongEnd}
        src={`/music/${songs[currentSongIndex]}`}
      />
      <div
        ref={lightRef}
        style={{
          width: "500px",
          height: "350px",
          margin: "50px auto",
          textAlign: "center",
          padding: "20px",
          borderRadius: "15px",
          color: isPlaying
              ? `rgba(${getColorFromVolume(volume).r}, ${getColorFromVolume(volume).g}, ${getColorFromVolume(volume).b}, 1)`
              : "white",
          fontSize: "2em",
          fontWeight: "bold",
          transition: "all 0.1s ease",
          position: "relative",
          paddingTop: "1%",
          display: "grid",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "90%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "1.2em",
            color: isPlaying
              ? `rgba(${getColorFromVolume(volume).r}, ${getColorFromVolume(volume).g}, ${getColorFromVolume(volume).b}, 1)`
              : "white", // Apply dynamic color based on volume or blue when paused
            cursor: "pointer", // Ensure the icon is clickable
            display: "flex",
            alignItems: "center", // Align items vertically
            justifyContent: "center", // Center items horizontally
            gap: "20px", // Add space between icons
            zIndex: 2, // Ensure the icons are above the light div
          }}
        >
          {/* Previous Icon */}
          <i
            className="fas fa-caret-left"
            style={{ cursor: "pointer" }}
            onClick={handlePreviousSong}
          ></i>

          {/* Play/Pause Icon */}
          {isPlaying ? (
            <i className="fas fa-pause" onClick={handleTogglePlay}></i>
          ) : (
            <i className="fas fa-play" onClick={handleTogglePlay}></i>
          )}

          {/* Next Icon */}
          <i
            className="fas fa-caret-right"
            style={{ cursor: "pointer" }}
            onClick={handleNextSong}
          ></i>
        </div>

        {/* Display the current song without file extension */}
        <div
            style={{ zIndex: 3 }}
        >
            {songs.length > 0 ? songs[currentSongIndex].replace(".mp3", "") : "Loading..."}
        </div>

        {/* Repeat and Shuffle Icons */}
        <img
            src={`/image_music/${songs.length > 0 ? songs[currentSongIndex].replace(".mp3", "") : "default"}.jpg`}
            alt="Album cover"
            onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop in case default image is also missing
                e.target.src = "/image_music/default.jpg"; // Set to default image
            }}
            style={{
                display: "block",
                width: "540px",
                height: "380px",
                // objectFit: "cover",
                borderRadius: "15px",
                position: "absolute",
                // left: "18%",
                // top: "15%",
            }}
        />
        <div
            style={{
                position: "absolute",
                top: "90%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "1.2em",
                color: isPlaying
                  ? `rgba(${getColorFromVolume(volume).r}, ${getColorFromVolume(volume).g}, ${getColorFromVolume(volume).b}, 1)`
                  : "white", // Apply dynamic color based on volume or blue when paused
                cursor: "pointer", // Ensure the icon is clickable
                display: "flex",
                alignItems: "center", // Align items vertically
                justifyContent: "center", // Center items horizontally
                gap: "200px", // Add space between icons
              }}
        >
          <i
            className={`fa-solid fa-repeat ${isRepeat ? "blue" : ""}`}
            style={{
              cursor: "pointer",
              color: isRepeat ? "blue" : "",
            }}
            onClick={() => setIsRepeat(!isRepeat)}
          ></i>
          <i
            className={`fa-solid fa-shuffle ${isShuffle ? "blue" : ""}`}
            style={{
              cursor: "pointer",
              color: isShuffle ? "blue" : "",
            }}
            onClick={() => setIsShuffle(!isShuffle)}
          ></i>
        </div>

        {/* Progress bar inside the same div */}
        <div
            style={{
                position: "relative",
                top: "67%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: isPlaying
                  ? `rgba(${getColorFromVolume(volume).r}, ${getColorFromVolume(volume).g}, ${getColorFromVolume(volume).b}, 1)`
                  : "white", // Apply dynamic color based on volume or blue when paused
                display: "flex",
                alignItems: "center", // Align items vertically
                justifyContent: "center", // Center items horizontally
                height: "fit-content",
              }} 
        >
          <span>
            {currentTime
              ? `${Math.floor(currentTime / 60)}:${String(Math.floor(currentTime % 60)).padStart(2, "0")}`
              : "00:00"}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 1}
            value={currentTime}
            onChange={handleProgressChange}
            style={{ width: "50%", margin: "0 10px" }}
          />
          <span>
            {duration
              ? `${Math.floor(duration / 60)}:${String(Math.floor(duration % 60)).padStart(2, "0")}`
              : "00:00"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Music;
