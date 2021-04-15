import { useEffect, useState } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import styles from './Stopwatch.module.css';

export default function Stopwatch() {
  const [timer, setTimer] = useState(0);
  const [status, setStatus] = useState('stop');

  useEffect(() => {
    let stream$ = new Subject();
    let myObservable = interval(100);
    myObservable.pipe(takeUntil(stream$)).subscribe(() => {
      if (status === 'start') {
        setTimer(prev => prev + 100);
      }
    });
    return () => {
      stream$.next();
      stream$.complete();
      stream$.unsubscribe();
    };
  }, [status]);

  const onToggle = () => {
    if (status !== 'start') {
      setStatus('start');
    }
    if (status === 'start') {
      setStatus('stop');
      setTimer(0);
    }
  };

  const onWait = () => {
    setStatus('wait');
  };

  const onReset = () => {
    setTimer(0);
  };

  return (
    <div className={styles.timerCntr}>
      <div className={styles.timer}>
        <div className={styles.timerDisplay}>
          {new Date(timer).toISOString().slice(14, 21)}
        </div>

        <div className={styles.controls}>
          <button type="button" className={styles.startBtn} onClick={onToggle}>
            Start / Stop
          </button>
          {/* <button type="button" className={styles.waitBtn} onClick={onWait}> */}
          <button
            type="button"
            className={styles.waitButton}
            onDoubleClick={onWait}
          >
            Wait
          </button>
          <button
            type="button"
            className={styles.resetButton}
            onClick={onReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
