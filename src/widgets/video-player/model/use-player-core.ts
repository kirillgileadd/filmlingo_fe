/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MouseEvent, useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { CURRENT_VIDEO_TIME } from "./const";
import { VideoVariantT } from "@/src/entities/film";

export const usePlayerCore = (
  videoId: number,
  videoVariant?: VideoVariantT
) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loadedPercentage, setLoadedPercentage] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  const src = videoVariant
    ? process.env.NEXT_PUBLIC_STATIC + videoVariant?.videoPath
    : null;

  useEffect(() => {
    if (videoRef.current && src) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        setIsVideoLoading(true);
        setTimeout(() => {
          hls.loadSource(src);
        }, 1000);

        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play();
          setIsPlaying(true);
        });

        // Устанавливаем длительность после загрузки потока HLS
        hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
          setDuration(data.details.totalduration);
          setIsVideoLoading(false);

          const currentVideoTime = localStorage.getItem(CURRENT_VIDEO_TIME);
          const currentVideoTimeObj = currentVideoTime
            ? JSON.parse(currentVideoTime)
            : null;

          if (
            currentVideoTimeObj &&
            videoId === currentVideoTimeObj.id &&
            videoRef.current
          ) {
            console.log("quality changed", currentVideoTimeObj.currentTime);
            setCurrentTime(currentVideoTimeObj.currentTime);
            videoRef.current.currentTime = currentVideoTimeObj.currentTime;
          }

          setIsLoaded(true);
        });

        return () => {
          hls.destroy();
          setIsLoaded(false);
        };
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = src;
        videoRef.current.addEventListener("loadedmetadata", () => {
          // Устанавливаем длительность для стандартных HLS потоков //TODO
          setDuration(videoRef.current?.duration || 0); // Для Safari
          videoRef.current?.play();
          setIsPlaying(true);
        });
      }
    }
  }, [src, videoId]);

  useEffect(() => {
    const video = videoRef.current;

    const updateLoadedPercentage = () => {
      if (video && video.buffered.length > 0 && duration > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const percentage = (bufferedEnd / duration) * 100;
        setLoadedPercentage(percentage);
      }
    };

    video?.addEventListener("progress", updateLoadedPercentage);

    return () => {
      video?.removeEventListener("progress", updateLoadedPercentage);
    };
  }, [duration]);

  const toggleMute = () => {
    if (videoRef.current) {
      if (volume === 0) {
        setVolume(0.1);
        videoRef.current.volume = 0.1;
      }

      setIsMuted((prevMuted) => !prevMuted);
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const playVideo = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (videoRef.current) {
      videoRef.current.volume = value[0];
      if (isMuted) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(false);
      }
    }
  };

  const togglePlayPause = (event: MouseEvent<HTMLElement>) => {
    if (event.target instanceof Element) {
      const isControlsClick =
        event.target.closest(".controls") &&
        !event.target.closest(".play-button");
      if (isControlsClick) return;

      event.stopPropagation();
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  const toggleFullscreen = () => {
    if (modalRef.current) {
      if (!isFullscreen) {
        if (modalRef.current.requestFullscreen) {
          modalRef.current.requestFullscreen();
          //@ts-ignore
        } else if (modalRef.current.mozRequestFullScreen) {
          //@ts-ignore
          modalRef.current.mozRequestFullScreen();
          //@ts-ignore
        } else if (modalRef.current.webkitRequestFullscreen) {
          //@ts-ignore
          modalRef.current.webkitRequestFullscreen();
          //@ts-ignore
        } else if (modalRef.current.msRequestFullscreen) {
          //@ts-ignore
          modalRef.current.msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          //@ts-ignore
        } else if (document.mozCancelFullScreen) {
          //@ts-ignore
          document.mozCancelFullScreen();
          //@ts-ignore
        } else if (document.webkitExitFullscreen) {
          //@ts-ignore
          document.webkitExitFullscreen();
          //@ts-ignore
        } else if (document.msExitFullscreen) {
          //@ts-ignore
          document.msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  return {
    isPlaying,
    setCurrentTime,
    setIsPlaying,
    setVolume,
    modalRef,
    videoRef,
    isLoaded,
    togglePlayPause,
    currentTime,
    loadedPercentage,
    isVideoLoading,
    duration,
    pauseVideo,
    playVideo,
    isMuted,
    handleVolumeChange,
    handleSeek,
    isFullscreen,
    toggleFullscreen,
    volume,
    toggleMute,
  };
};
