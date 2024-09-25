import dynamic from 'next/dynamic'
 
const PDFRotator = dynamic(
  () => import('./pdf-rotator/page'),
  { ssr: false }
)
 
export default function Home() {
  return (
    <div>
      <PDFRotator />
    </div>
  )
}