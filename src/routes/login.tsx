import { SignIn } from '@clerk/tanstack-react-start';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div>You need to sign in first!</div>
      <SignIn />
    </>
  );
}
