
import Designer from '@/components/Designer/Designer'
import FormBuilder from '@/components/FormBuilder/FormBuilder'


function TestBuilder() {
  const dummyForm = {

      name: "Test Form",
      id: 1,
      userId: "user-id",
      createdAt: new Date(),
      published: false,
      description: "This is a test Form",
      content: "[]",
      visits: 1,
      submissions: 1,
      shareUrl: "shareUrl",

  }
  return (
    <div className='flex w-full h-screen flex-grow mx-auto'>
       <FormBuilder form={dummyForm} isTest={true}/>
    </div>
  )
}

export default TestBuilder