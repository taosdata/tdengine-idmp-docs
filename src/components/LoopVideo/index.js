/*
 * Copyright (c) TAOS Data, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: LicenseRef-TAOSData-Commercial
 *
 * This file is proprietary to TAOS Data, Inc. and may contain confidential
 * information. No rights are granted by this file. Use is permitted only
 * under a written agreement with TAOS Data, Inc. or an authorized affiliate.
 * Unauthorized copying, modification, distribution, or disclosure, in whole
 * or in part, by any medium, is strictly prohibited.
 */

import {useEffect, useRef} from 'react';
import styles from './styles.module.css';

/**
 * Silent looping replacement for a documentation GIF.
 * Pauses on the first frame when the reader requests reduced motion.
 */
export default function LoopVideo({src, label}) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof window.matchMedia !== 'function') {
      return undefined;
    }
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      if (media.matches) {
        video.pause();
        try {
          video.currentTime = 0;
        } catch {
          // Some browsers reject seeking before metadata is ready.
        }
      } else {
        video.play().catch(() => {});
      }
    };
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  return (
    <video
      ref={ref}
      className={styles.video}
      autoPlay
      loop
      muted
      playsInline
      width={1668}
      height={854}
      aria-label={label}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
