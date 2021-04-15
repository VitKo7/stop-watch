// Example for a snoozable alarm clock, lovingly ripped off from:
// John Lindquist's RxJS with Vue https://www.youtube.com/watch?v=_74d-NdeqOI
import { useState, useEffect } from 'react';
import { of, interval, concat, Subject } from 'rxjs';
import {
  takeWhile,
  takeUntil,
  scan,
  startWith,
  repeatWhen,
  share,
  filter,
} from 'rxjs/operators';
import styles from './AlarmClock.module.css';

export default function AlarmClock() {
  const [state, setState] = useState();

  const countup$ = interval(1000)
    .pipe(
      startWith(1),
      scan(time => time + 1),
      takeWhile(time => time < 100),
    )
    .pipe(share());

  const actions$ = new Subject();
  const restart$ = actions$.pipe(filter(action => action === 'restart'));
  const reset$ = actions$.pipe(filter(action => action === 'reset'));

  const stopWatchTimer$ = concat(countup$, of('Timer restarted!')).pipe(
    repeatWhen(() => restart$),
  );

  const observable$ = concat(
    stopWatchTimer$.pipe(takeUntil(reset$)),
    of('Timer turned off.'),
  );

  useEffect(() => {
    const sub = observable$.subscribe(setState);
    return () => sub.unsubscribe();
  }, []);

  return (
    <>
      <h3 className={styles.alarmTitle}>Timer Clock</h3>
      <div className={styles.display}>{state}</div>

      <button
        className={styles.restart}
        onClick={() => actions$.next('restart')}
      >
        Restart
      </button>

      <button className={styles.reset} onClick={() => actions$.next('reset')}>
        Reset
      </button>
    </>
  );
}
