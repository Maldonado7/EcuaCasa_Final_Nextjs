import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "../../../lib/supabase";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Provider profile photo uploader
  providerProfileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await currentUser();
      
      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");
      
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id, userEmail: user.emailAddresses[0]?.emailAddress };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Profile image upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // Save to Supabase
      try {
        const { error } = await supabase
          .from('providers')
          .update({ profile_image_url: file.url })
          .eq('user_id', metadata.userId);

        if (error) {
          console.error('Error updating profile image in database:', error);
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
      }

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),

  // Provider work gallery uploader
  providerGallery: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async ({ req }) => {
      const user = await currentUser();
      
      if (!user) throw new UploadThingError("Unauthorized");
      
      return { userId: user.id, userEmail: user.emailAddresses[0]?.emailAddress };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Gallery image upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // Save gallery images to Supabase
      try {
        const { error } = await supabase
          .from('provider_gallery')
          .insert({
            provider_user_id: metadata.userId,
            image_url: file.url,
            image_type: 'work_sample',
            uploaded_at: new Date().toISOString()
          });

        if (error) {
          console.error('Error saving gallery image to database:', error);
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
      }

      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),

  // Before/After photos uploader
  beforeAfterPhotos: f({ image: { maxFileSize: "4MB", maxFileCount: 20 } })
    .middleware(async ({ req }) => {
      const user = await currentUser();
      
      if (!user) throw new UploadThingError("Unauthorized");
      
      return { userId: user.id, userEmail: user.emailAddresses[0]?.emailAddress };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Before/After photo upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // Save before/after images to Supabase
      try {
        const { error } = await supabase
          .from('provider_gallery')
          .insert({
            provider_user_id: metadata.userId,
            image_url: file.url,
            image_type: 'before_after',
            uploaded_at: new Date().toISOString()
          });

        if (error) {
          console.error('Error saving before/after image to database:', error);
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
      }

      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),

  // Certification documents uploader
  certificationDocuments: f({ image: { maxFileSize: "8MB", maxFileCount: 5 } })
    .middleware(async ({ req }) => {
      const user = await currentUser();
      
      if (!user) throw new UploadThingError("Unauthorized");
      
      return { userId: user.id, userEmail: user.emailAddresses[0]?.emailAddress };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Certification document upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // Save certification documents to Supabase
      try {
        const { error } = await supabase
          .from('provider_gallery')
          .insert({
            provider_user_id: metadata.userId,
            image_url: file.url,
            image_type: 'certification',
            uploaded_at: new Date().toISOString()
          });

        if (error) {
          console.error('Error saving certification document to database:', error);
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
      }

      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;