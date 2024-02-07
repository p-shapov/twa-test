import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTonConnect';
import { useCounterContract } from './hooks/useCounterContract';
import { ComponentProps, DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren, useLayoutEffect, useRef, useState, } from 'react';

const ExpandableContent: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement>> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animateTo, setAnimateTo] = useState(0);

  useLayoutEffect(() => {
    const height = ref.current?.scrollHeight ?? 0;
    setAnimateTo(height);
  }, [ref]);

  return <div {...props} ref={ref} style={{ ...(props.style || {}), height: animateTo + 'px', transition: 'height 1s linear' }} />;
}

const Expandable: FC<PropsWithChildren<{ isOpen: boolean } & ComponentProps<typeof ExpandableContent>>> = ({ isOpen, ...props }) => {
  return isOpen && <ExpandableContent {...props} />
}

function App() {
  const { connected } = useTonConnect();
  const [isOpen, setIsOpen] = useState(false);
  const { value, address, sendIncrement } = useCounterContract();

  return (
    <div className='App'>
      <button onClick={() => setIsOpen((x) => !x)}>Toggle</button>
      <div className='Container'>
        <TonConnectButton />

        <div className='Card'>
          <b>Counter Address</b>
          <div className='Hint'>{address?.slice(0, 30) + '...'}</div>
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{value ?? 'Loading...'}</div>
        </div>

        <a
          className={`Button ${connected ? 'Active' : 'Disabled'}`}
          onClick={() => {
            sendIncrement();
          }}
        >
          Increment
        </a>
      </div>
      <Expandable style={{ width: '320px' }} isOpen={isOpen}>The Element.clientHeight read-only property is zero for elements with no CSS or inline layout boxes; otherwise, it's the inner height of an element in pixels. It includes padding but excludes borders, margins, and horizontal scrollbars (if present).</Expandable>
    </div>
  );
}

export default App
