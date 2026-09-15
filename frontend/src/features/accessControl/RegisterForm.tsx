import { useState, type FormEvent } from 'react';
import './registration.css';

const fields = [
  { name: 'full_name', label: 'Full name', type: 'text', autoComplete: 'name', maxLength: 160 },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', maxLength: 255 },
  { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password' },
  { name: 'contact_number', label: 'Contact number', type: 'tel', autoComplete: 'tel', maxLength: 32 },
];

export function RegisterForm() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [pending, setPending] = useState(false);
  const [created, setCreated] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    setPending(true);
    setErrors({});
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      if (response.status === 201) { form.reset(); setCreated(true); }
      else setErrors(result.errors ?? { form: ['Unable to create your account. Please try again.'] });
    } catch {
      setErrors({ form: ['Unable to reach the server. Please try again.'] });
    } finally { setPending(false); }
  }
  return <main className="registration-page">
    <h1>Create Account</h1>
    {created ? <p role="status">Your Attendee account has been created.</p> :
      <form onSubmit={submit} noValidate>
        <p>All fields are required.</p>
        <p id="password-policy">Password must contain at least 12 characters, one uppercase letter,
          one number and one special character (punctuation or symbol).</p>
        {fields.map(field => <div className="registration-field" key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input {...field} id={field.name} required disabled={pending}
            aria-invalid={Boolean(errors[field.name])}
            aria-describedby={`${field.name}-errors${field.name === 'password' ? ' password-policy' : ''}`} />
          <div id={`${field.name}-errors`} aria-live="polite">
            {errors[field.name]?.map(message => <p key={message}>{message}</p>)}
          </div>
        </div>)}
        <div role="alert">{errors.form?.map(message => <p key={message}>{message}</p>)}</div>
        <button className="primary-action" disabled={pending}>{pending ? 'Creating account...' : 'Create Account'}</button>
      </form>}
  </main>;
}
