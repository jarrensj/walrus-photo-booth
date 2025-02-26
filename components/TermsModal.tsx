import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px] max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>
            Walrus Photo Booth Application - Terms of Use
          </DialogTitle>
          <DialogDescription>
            Please read our terms and conditions carefully.
          </DialogDescription>
        </DialogHeader>

        <div className='py-4'>
          <p className='mb-4'>
            <span className='font-semibold'>Effective Date:</span>Effective
            Date: February 25, 2025
          </p>
          <p className='mb-4'>
            Welcome to the Walrus Photo Booth (the “Application”). By using the
            Application, you (“User” or “you”) agree to these Terms of Use
            (“Terms”). Please read them carefully before proceeding. If you do
            not agree to these Terms, do not use the Application.
          </p>
          <h3 className='font-semibold mb-2'>
            1. Consent to Photograph & Release
          </h3>
          <p className='mb-4'>
            By using the Application to capture photographs, you consent to be
            photographed and grant the Walrus Foundation (“Walrus,” “we,” or
            “us”) permission to store, display, and distribute your photos on
            the website, www.walrusphotoboth.com (the “Website”), and as further
            outlined in these Terms. You affirm that you have the authority to
            grant this consent and that any individuals appearing in the photos
            also consent to such use.
          </p>

          <h3 className='font-semibold mb-2'>
            2. Public Display & Decentralized Storage
          </h3>
          <p className='mb-4'>
            All photos taken using the Application will be stored on Walrus, a
            decentralized storage network, and will be publicly viewable by
            anyone accessing the network, including the Website. As Walrus
            operates on decentralized storage, photos cannot be modified,
            deleted, or restricted after they have been uploaded. By using the
            Application, you acknowledge and accept that your photos will be
            permanently stored and publicly available.
          </p>
          <p className='mb-4'>
            Notwithstanding the foregoing, your photo may be removed from the
            Website. If you wish to remove your photo from the website, please
            contact notices@walrus.xyz.
          </p>

          <h3 className='font-semibold mb-2'>3. License to Use Photographs</h3>
          <p className='mb-4'>
            By using the Application, you grant Walrus a worldwide, perpetual,
            irrevocable, royalty-free, sublicensable, and transferable license
            to use, reproduce, distribute, modify, adapt, publicly display, and
            create derivative works from your photos for promotional, marketing,
            and other lawful purposes. This includes, but is not limited to, use
            in social media, advertisements, printed materials, websites, and
            other digital or physical marketing channels.
          </p>

          <h3 className='font-semibold mb-2'>4. User Responsibilities</h3>
          <p className='mb-4'>
            You agree not to upload any photos that contain unlawful, offensive,
            defamatory, or inappropriate content (“Abusive Material”). You
            further affirm that you have obtained necessary permissions from all
            individuals depicted in the photos and that your submission does not
            violate any third-party rights, including intellectual property or
            privacy rights.
          </p>
          <p className='mb-4'>
            We reserve the right to take down any photos from the Website that
            we deem to be Abusive Material.
          </p>

          <h3 className='font-semibold mb-2'>5. No Expectation of Privacy</h3>
          <p className='mb-4'>
            Because all photos are stored on a decentralized, publicly
            accessible network, you acknowledge that you have no expectation of
            privacy concerning any photos uploaded through the Application.
            Walrus is not responsible for how third parties access, use, or
            share publicly available photos.
          </p>

          <h3 className='font-semibold mb-2'>6. Disclaimer of Liability</h3>
          <p className='mb-4'>
            Walrus is not responsible for any misuse of photos stored on its
            decentralized network. By using the Application, you release Walrus
            and its affiliates, officers, employees, and agents from any
            liability related to the public display, access, or use of your
            photographs by third parties.
          </p>
          <p className='mb-4'>
            Walrus does not guarantee uninterrupted operation of the Application
            or the security of stored photos and is not responsible for any loss
            or unauthorized access due to factors beyond its control, including
            third-party actions, system failures, or cyber-attacks.
          </p>

          <h3 className='font-semibold mb-2'>7. Modification of Terms</h3>
          <p className='mb-4'>
            We may update these Terms from time to time. Continued use of the
            Application after such updates constitutes acceptance of the revised
            Terms. The latest version will always be available within the
            Application or on our website.
          </p>

          <h3 className='font-semibold mb-2'>
            8. Governing Law & Jurisdiction
          </h3>
          <p className='mb-4'>
            These Terms shall be governed by and construed in accordance with
            the laws of the Cayman Islands without regard to its conflict of
            laws provisions.
          </p>

          <h3 className='font-semibold mb-2'>
            9. Mandatory Arbitration of Disputes.
          </h3>
          <p className='mb-4'>
            We each agree that any dispute, claim or controversy arising out of
            or relating to these Terms or use of the Application (collectively,
            “Disputes”) will be resolved solely by binding, individual
            arbitration and not in a class, representative or consolidated
            action or proceeding. You and Walrus agree that the Cayman Islands
            Arbitration Law governs the interpretation and enforcement of these
            Terms, and that you and the Organization are each waiving the right
            to a trial by jury or to participate in a class action. This
            arbitration provision shall survive termination of these Terms.
          </p>

          <h3 className='font-semibold mb-2'>10. Contact Information</h3>
          <p className='mb-4'>
            If you have any questions about these Terms, please contact us at
            notices@walrus.xyz.
          </p>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;
