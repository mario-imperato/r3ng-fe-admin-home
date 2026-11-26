import { NoOpPipe } from './no-op.pipe';

describe('NoOpPipe', () => {
  it('create an instance', () => {
    const pipe = new NoOpPipe();
    expect(pipe).toBeTruthy();
  });
});
