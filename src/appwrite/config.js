import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class service {
  client = new Client();

  database;
  storage;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featureImage, status, userId }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("error createPost:: ", error);
    }
  }
  async updatePost(slug, { title, content, featureImage, status }) {
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
        }
      );
    } catch (error) {
      console.log("error :: configSerive:: updatePost:: ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("error ConfigService:: deletePost::", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("error configService :: getPost :: ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("error configServie:: getAllPost ::", error);
      return false;
    }
  }

  //file methods.
  async uploadFile(file) {
    try {
      await this.storage.createFile(config.appwriteBucketId, ID.unique(), file);
      return true;
    } catch (error) {
      console.log("error configServie :: uploadFile :: ", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("error configServie :: deleteFile :: ", error);
    }
  }

  getfilePreview(fileId) {
    return this.storage.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
